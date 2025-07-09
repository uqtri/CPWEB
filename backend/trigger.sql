CREATE OR REPLACE FUNCTION update_user_points()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE "User"
        SET points = points + (SELECT points FROM "Problem" WHERE id = NEW.problemId)
        WHERE id = NEW.userId;
    ELSIF TG_OP = 'DELETE' THEN

        if OLD.isDeleted THEN
            RETURN OLD;
        END IF;

        UPDATE "User"
        SET points = points - (SELECT points FROM "Problem" WHERE id = OLD.problemId)
        WHERE id = OLD.userId;
    ELSIF TG_OP = 'UPDATE' THEN
        IF NEW.isDeleted AND NOT OLD.isDeleted THEN 
            UPDATE "User"
            SET points = points - (SELECT points FROM "Problem" WHERE id = OLD.problemId)
            WHERE id = OLD.userId;
        ELSIF NOT NEW.isDeleted AND OLD.isDeleted THEN
            UPDATE "User"
            SET points = points + (SELECT points FROM "Problem" WHERE id = NEW.problemId)
            WHERE id = NEW.userId;
		    END IF;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER "User_points_update"
AFTER INSERT ON "UserSolvedProblem"
FOR EACH ROW
EXECUTE FUNCTION update_user_points();

---------
CREATE OR REPLACE FUNCTION update_problem_points()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE "User"
    SET points = points - OLD.points + NEW.points
    WHERE id IN (
        SELECT userId FROM "UserSolvedProblem" WHERE (problemId = OLD.id AND isDeleted = false)
    );
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER "Problem_points_update"
BEFORE UPDATE on "Problem"
FOR EACH ROW
EXECUTE FUNCTION update_problem_points();


