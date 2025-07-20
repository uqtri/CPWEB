import { Link } from "react-router-dom";

export default function Problem({ problems }: { problems?: any }) {
  console.log("Problems: v", problems);
  return (
    <div className="w-full p-4">
      <h1 className="mb-4">Các bài đã giải</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {problems.map((problem: any) => (
          <Link to={`/problem/${problem?.problem?.slug}`}>
            <div
              key={problem?.problem?.id}
              className="border p-4 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <h2 className="text-lg font-semibold">
                {problem?.problem?.title}
              </h2>

              <p className="text-sm text-gray-600">
                Độ khó: {problem?.problem?.difficulty}
              </p>
            </div>
          </Link>
        ))}
        {problems.length === 0 && (
          <div className="col-span-3 text-center text-gray-500">
            Chưa có bài nào được giải.
          </div>
        )}
      </div>
    </div>
  );
}
