import Editor from "./_components/Editor";
import Header from "./_components/Header"
import Output from "./_components/Output";

export default function Home() {
  return (
    <div className="min-h-full">
      <div className="max-w-[1800px] mx-auto p-4">
        <Header/>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Editor/>
          <Output/>
        </div>
      </div>
    </div>
  );
}