import { Skeleton } from "@/components/ui/skeleton";

const SkeletonOrder = ({ rows = 5, columns = 4 }) => {
  return (
    <div className="w-full overflow-x-auto mt-5">
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr>
            {[...Array(columns)].map((_, index) => (
              <th key={index} className="px-4 py-3 text-left bg-muted">
                <Skeleton className="h-5 w-24" />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[...Array(rows)].map((_, rowIndex) => (
            <tr key={rowIndex}>
              {[...Array(columns)].map((_, colIndex) => (
                <td key={colIndex} className="px-4 py-4 border-b border-muted">
                  <Skeleton className="h-5 w-full" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SkeletonOrder;
