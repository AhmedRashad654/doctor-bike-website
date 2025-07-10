import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonCategory() {
  return (
    <div className="grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 w-full justify-between max-w-7xl mx-auto mt-10 px-2">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((e, i) => (
        <div className="flex flex-col space-y-3" key={i}>
          <Skeleton className="h-[125px] w-full md:w-[250px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full md:w-[250px]" />
          </div>
        </div>
      ))}
    </div>
  );
}
