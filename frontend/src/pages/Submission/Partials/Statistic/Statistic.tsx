import { ChartBar } from "lucide-react";

export default function Statistic({ data }: { data: any }) {
  console.log(data, "@");
  const othersCount =
    data?.total -
    (data?.acceptedCount +
      data?.wrongAnswerCount +
      data?.timeLimitExceededCount);
  console.log(data?.total, "total");
  console.log((othersCount / data?.total) * 100);
  return (
    <div className="p-4 bg-white">
      <div className="flex items-center gap-4">
        <ChartBar />
        <h2 className="text-lg font-semibold">Thống kê</h2>
      </div>
      <div>
        <div className="mt-4">
          <h3 className="text-md font-semibold">
            Tổng số bài nộp: {data?.total}
          </h3>
        </div>
        {/* tỉ lệ thành công*/}
        <div className="mt-4">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                Tỷ lệ thành công
              </span>
              <span className="text-sm font-bold text-green-600">
                {Math.round((data?.acceptedCount / data?.total) * 100) || 0}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full transition-all duration-500"
                style={{
                  width: `${(data?.acceptedCount / data?.total || 0) * 100}%`,
                }}
              ></div>
            </div>
          </div>
        </div>
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-700 mb-3">
            Phân tích trạng thái
          </h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Thành công</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-900">
                  {data?.acceptedCount}
                </span>
                <div className="w-16 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{
                      width: `${
                        (data?.acceptedCount / data?.total || 0) * 100
                      }%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Wrong Answer</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-900">
                  {data?.wrongAnswerCount}
                </span>
                <div className="w-16 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-red-500 h-2 rounded-full"
                    style={{
                      width: `${
                        (data?.wrongAnswerCount / data?.total || 0) * 100
                      }%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Quá thời gian</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-900">
                  {data?.timeLimitExceededCount}
                </span>
                <div className="w-16 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-500 h-2 rounded-full"
                    style={{
                      width: `${
                        (data?.timeLimitExceededCount / data?.total) * 100
                      }%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Khác</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-900">
                  {othersCount}
                </span>
                <div className="w-16 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gray-500 h-2 rounded-full"
                    style={{
                      width: `${
                        (Math.round((othersCount / data?.total) * 100) ||
                          0) as number
                      }%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
