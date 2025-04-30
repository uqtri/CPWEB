import { Link } from "react-router-dom";
import { Users, CodeIcon, PenTool, Trophy } from "lucide-react";
import StatCard from "../../components/StatCard/StatCard";
const code = `def find_two_sum(nums, target):
    """
    Tìm hai số trong mảng có tổng bằng target.
    
    Args:
        nums: Danh sách các số
        target: Tổng cần tìm
        
    Returns:
        Cặp chỉ số của hai số có tổng bằng target
    """
    num_map = {}
    
    for i, num in enumerate(nums):
        complement = target - num
        if complement in num_map:
            return [num_map[complement], i]
        num_map[num] = i
    
    return []

# Test case
nums = [2, 7, 11, 15]
target = 9
result = find_two_sum(nums, target)
print(f"Kết quả: {result}")  # Kết quả: [0, 1]`;

export default function Banner() {
  return (
    <div className="relative w-full">
      <div className="absolute opacity-10 animate-code-flow overflow-hidden w-full">
        <pre>{code}</pre>
      </div>
      <div className="left-side-banner">
        <span className="relative text-blue-600 text-3xl font-bold after:absolute after:left-0 after:-bottom-1 after:h-1 after:w-full after:bg-blue-400 after:rounded-md">
          CodeForge
        </span>
        <div className="mt-3">
          <p className="text-4xl font-bold">
            Nền tảng lập trình thi đấu{" "}
            <span
              className="animate-[var(--animate-glitch)] inline-block text-[#eb2567] font-bold text-4xl drop-shadow-[0_0_10px_#eb2567]"
              style={{
                transform: "translate(-5px, 5px)",
              }}
            >
              #1
            </span>
          </p>
          <p className="mt-2 text-sm font-semibold text-gray-500">
            Nâng cao kỹ năng lập trình, giải thuật và tư duy của bạn thông qua
            các thử thách, cuộc thi và cộng đồng lập trình viên Việt Nam.
          </p>
          <Link to="/challenges">
            <button className="text-white py-3 text-center w-full rounded-md bg-primary mt-4">
              Bắt đầu ngay
            </button>
          </Link>
          <Link to="/about-us">
            <button className="mt-4 py-3 text-center w-full text-primary border border-primary rounded-md">
              Tìm hiểu thêm
            </button>
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <StatCard
            icon={<Users className="text-primary" />}
            title="10,000+"
            description="Người tham gia"
          />
          <StatCard
            icon={<PenTool className="text-primary" />}
            title="500+"
            description="Bài tập khác nhau"
          />{" "}
          <StatCard
            icon={<Trophy className="text-primary" />}
            title="50+"
            description="Cuộc thi mỗi năm"
          />
          <StatCard
            icon={<CodeIcon className="text-primary" />}
            title="8"
            description="Ngôn ngữ hỗ trợ"
          />
        </div>
      </div>
      <div className="right-side-banner p-4 border border-gray-300 rounded-md shadow-md mt-4">
        <div>
          <div className="flex items-center border-b border-gray-200 py-2">
            <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
            <div className="flex-grow text-center text-xs sm:text-sm text-gray-500 font-mono">
              code_challenge.py
            </div>
          </div>
        </div>
        <div className="overflow-auto">
          <pre>{code}</pre>
        </div>
      </div>
    </div>
  );
}
