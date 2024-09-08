import { Tag } from "../types";

type EditTagsModalProps = {
  avaiableTags: Tag[];
  handleClose: () => void;
  onDeleteTag: (id: string) => void;
};

export const EditTagsModal = ({
  avaiableTags,
  handleClose,
  onDeleteTag,
}: EditTagsModalProps) => {
  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-10">
        <div className="fixed inset-x-16 inset-y-48 lg:inset-1/4 bg-white p-6 rounded shadow-lg z-60 overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-300">
          <div className="flex justify-between items-center mb-4 pb-4 border-b">
            <h1 className="text-2xl font-bold">Edit Tags</h1>
            <button onClick={handleClose}>&#x2715;</button>
          </div>
          <div className="text-sm flex flex-col gap-4">
            {avaiableTags.map((tag) => (
              <div
                key={tag.id}
                className="flex justify-between items-center gap-3"
              >
                <h3 className="border-solid border-2 px-4 py-1 flex-1 rounded break-words">
                  {tag.label}
                </h3>
                <button
                  className="text-xs border-solid border-2 border-red-200 text-red-300 px-2 py-2 rounded"
                  onClick={() => onDeleteTag(tag.id)}
                >
                  &#x2715;
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
