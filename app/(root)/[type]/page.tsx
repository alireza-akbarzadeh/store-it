import { Sort } from "@/components/sort";
import { getFiles } from "@/lib/actions/file.actions";
import { Models } from "node-appwrite";
import { Card } from "@/components/card";

export default async function PageType({ params }: SearchParamProps) {
  const type = ((await params)?.type as string) || "";
  const files = await getFiles();
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
