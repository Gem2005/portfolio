import Image from "next/image";
import Navbar from "@/components/navbar";
import { CodeBlock } from "@/components/ui/codeblock";

export default function Home() {
  return (
    <>
      <Navbar />
    <CodeBlock
  language="typescript"
  filename="main.tsx"
  tabs={[
    { name: 'api.ts', code: "fetchData()" },
    { name: 'styles.css', code: ".card { padding: 1rem }", language: 'css' }
  ]}
  breadcrumb={['src', 'components']}
/>
    </>
  );
}
