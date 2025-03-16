import EditorPanel from "./_components/EditorPanel";
import Header from "./_components/Header"
import InputPanel from "./_components/InputPanel";
import OutputPanel from "./_components/OutputPanel";

export default function Home() {
  return (
    <div className="min-h-full">
      <div className="max-w-[1800px] mx-auto p-4">
        <Header/>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <EditorPanel/>
          <div className="grid grid-rows-2 gap-4">
            <InputPanel/>
            <OutputPanel/>

          </div>
        </div>
      </div>
    </div>
  );
}