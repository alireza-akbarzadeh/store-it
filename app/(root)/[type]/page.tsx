import { Sort } from "@/components/sort";
import { getFiles } from "@/lib/actions/file.actions";
import { Models } from "node-appwrite";
import { Card } from "@/components/card";
import { getFileTypesParams } from "@/lib/utils";

export default async function PageType({
  params,
  searchParams,
}: SearchParamProps) {
  const type = ((await params)?.type as string) || "";
  const types = getFileTypesParams(type) as FileType[];
  const searchText = ((await searchParams)?.query as string) || "";
  const sort = ((await searchParams)?.sort as string) || "";

  const files = await getFiles({ types, searchText, sort });

  return (
    <div className="page-container">
      <section className="w-full">
        <h1 className="h1 capitalize ">{type}</h1>

        <div className="total-size-section">
          <p className="body-1">
            Total : <span className="h5">0 MB</span>
          </p>
          <div className="sort-container">
            <p className="body-1 hidden text-light-200 sm:block">Sort by:</p>
            <Sort />
          </div>
        </div>
      </section>
      {files?.total > 0 ? (
        <section className="file-list">
          {files?.documents?.map((file: Models.Document) => (
            <Card file={file} key={file.$id} />
          ))}
        </section>
      ) : (
        <p className="empty-list">no file uploader</p>
      )}
    </div>
  );
}
