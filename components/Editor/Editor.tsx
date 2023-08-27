import { $getRoot, $getSelection, EditorState, createEditor } from 'lexical';
import { FC, useEffect } from 'react';

import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";

import { SyntheticEvent, useState } from 'react';
import axios from 'axios';
import { useDateStore } from '../../hooks/SelectDateStore';
import { format } from 'date-fns';
import ExportPlugin from '../plugins/ExportPluginHTML';
import ExportPluginJson from '../plugins/ExportPluginJson';
import { ToolbarPlugin } from '../plugins/ToolbarPlugin';
import { AutoFocusPlugin } from '../plugins/AutoFocusPlugin';

import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';
import styles from "./Editor.module.scss";
import { CheckListPlugin } from "@lexical/react/LexicalCheckListPlugin";
import { CodeHighlightPlugin } from "../plugins/CodeHighlightPlugin";
import { nodes } from "./nodes";
import { theme } from './editorTheme';
import { InlineToolbarPlugin } from '../plugins/InlineToolbarPlugin';
import TreeViewPlugin from '../plugins/TreeViewPlugin';
import { ImportPlugin } from '../plugins/ImportPlugin';
import { $generateNodesFromDOM } from '@lexical/html';
import { ImportPluginHTML } from '../plugins/ImportPluginHTML';
// enum EvaluationType {
//   A = 'A',
//   B = 'B',
//   C = 'C',
//   D = 'D',
//   E = 'E',
// }





export const loadData = (): string => {
  // JSON.stringify(editorState)
  const text = '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"this is editorState example.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}'
  const text2 = '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"this is editorState example.a","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}'
  return text2;
};


const EvaluationType = {
  A: 'A',
  B: 'B',
  C: 'C',
  D: 'D',
  E: 'E',
}

interface Item {
  id: number;
  naisei: string;
  created_at?: string
  // 他のプロパティがあればここに追加
}

// const theme = {
//   // Theme styling goes here
//   // ...
// }

function MyCustomAutoFocusPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    editor.focus();
    console.log("editorrr", editor);

  }, [editor]);

  return null;
}

function onError(error: any) {
  console.error(error);
}

// const defaltText = 'default text daaaa'

export const Editor: FC<{
  defaultContentAsHTML?: string;
}> = ({ defaultContentAsHTML }) => {


  // const exportAsHTML = (contenAsHTML: string) => {
  //   setData(contenAsHTML)
  //   console.log("exporthtml", contenAsHTML);
  // };
  const exportAsJson = (contenAsJson: string) => {
    // const jsonString = JSON.stringify(contenAsJson);
    setData(contenAsJson)
    // console.log("jsontostring", data);
    return contenAsJson
  };

  const importAsJson = (contenAsJson: string) => {
    // const jsonString = JSON.stringify(contenAsJson);
    // setData(contenAsJson)
    // console.log("jsontostring", data);
    return contenAsJson
  };


  const [naisei, setNaisei] = useState<any>();
  // const [naiseiById, setNaiseiById] = useState<any>();
  const [evaluationType, setEvaluationType] = useState(EvaluationType.A);
  const [data, setData] = useState('');

  const [serializedEditorState, setSerializedEditorState] = useState<string>(
    ""
  );
  const editor = createEditor();

  // 追加
  const selectedDay = useDateStore((state) => state.selectedDay);

  const setSelectedDay = useDateStore((state) => state.setSelectedDay);
  const footer = selectedDay ? (
    <p className='text-lg'>select : {format(selectedDay, 'yyyy-MM-dd')}.</p>
  ) : (
    <p>Please pick a day.</p>
  );
  // const footerDate = footer.props.children[1]
  const handleUpdate = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      // naiseiがすでに存在していたらアップデートにする
      // const id = naisei.id

      const apiUrl = `http://localhost:3000/naisei/1/1`;
      const response = await axios.patch(apiUrl, {
        naisei: data,
        evaluation_type: evaluationType,
      });
      return response
      // console.log("hundlwupdate", response.data); // Handle the response as needed

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setSerializedEditorState("");
    const footerDate = footer.props.children[1]

    // APIのエンドポイントを指定
    // const apiUrl = `http://localhost:3000/naisei?created_at=${footerDate}`;


    // Axiosを使用してAPIデータをフェッチ
    // axios.get(apiUrl)
    //   .then(response => {
    //     const resData = response.data.map((item: any) => item.naisei);
    //     const resDataString: string = resData.join('');
    //     // const stringData = response.data.json()
    //     setData(resDataString);
    //     setSerializedEditorState(resDataString);

    //   })
    //   .catch(error => {
    //     console.error('Error fetching data:', error);
    //   });
    // const defaultvalue = loadData()
    // const defaultNaisei2 = data.map(item => item.naisei).reduce((acc, currentValue) => acc + currentValue, '');

  }, [selectedDay]); // 空の配列を渡すことで、コンポーネントがマウントされたときにのみ実行されるようにします。
  // setSerializedEditorState(data);
  // console.log("setData of Editor", serializedEditorState);
  // console.log("not useEffext data:", data);


  function onChange(editorState: any) {
    editorState.read(() => {
      const root = $getRoot();
      const selection = $getSelection();
      const tomato = root.__cachedText
      // console.log("onchange editorstate", root, selection, tomato);
      setNaisei(tomato);
    });
  }

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const apiUrl = 'http://localhost:3000/naisei';
      const response = await axios.post(apiUrl, {
        naisei: naisei,
        evaluation_type: evaluationType,
      });
      // console.log(response.data); // Handle the response as needed
    } catch (error) {
      console.error(error);
    }
  };

  if (!serializedEditorState) return <>loading...initialconfがデフォのEditor.tsxを表示</>;



  // const html = tree.html; // TreeのHTML要素を取得

  const initialConfig = {
    namespace: 'MyEditor',
    theme: theme,
    nodes: nodes,
    onError,
    // editorState: editor.parseEditorState(serializedEditorState)
    editorState: serializedEditorState
  };
  return (
    <LexicalComposer initialConfig={initialConfig}>
      {/* <ImportPluginHTML defaultContentAsHTML={defaultContentAsHTML} /> */}
      <ToolbarPlugin />
      <InlineToolbarPlugin />
      <div className={styles.editorContainer}>
        {/* <PlainTextPlugin
            contentEditable={<ContentEditable />}
            placeholder={<div>write your naisei</div>}
            ErrorBoundary={LexicalErrorBoundary}
          /> */}
        <RichTextPlugin
          contentEditable={<ContentEditable className={styles.contentEditable} />}
          placeholder={<>write your naisei</>}
          ErrorBoundary={LexicalErrorBoundary}
        />
      </div>
      <OnChangePlugin onChange={onChange} />
      {data ?
        <form onSubmit={handleUpdate}>
          <label>
            Evaluation Type:
            <select value={evaluationType} onChange={(e) => setEvaluationType(e.target.value)}>
              {Object.values(EvaluationType).map((value) => (
                <option key={value} value={value}>{value}</option>
              ))}
            </select>
          </label>
          <button type="submit">Update Naisei</button>
        </form>
        : <>とりあえず何も入れない</>
        // <form onSubmit={handleUpdate}>
        //   <label>
        //     Evaluation Type:
        //     <select value={evaluationType} onChange={(e) => setEvaluationType(e.target.value)}>
        //       {Object.values(EvaluationType).map((value) => (
        //         <option key={value} value={value}>{value}</option>
        //       ))}
        //     </select>
        //   </label>
        //   <button type="submit">Updated Naisei</button>
        // </form>
      }
      <AutoFocusPlugin />
      <HistoryPlugin />
      <CheckListPlugin />
      <CodeHighlightPlugin />

      {/* <HistoryPlugin /> */}
      {/* <TreeViewPlugin /> */}
      {/* <AutoFocusPlugin /> */}
      {/* <MarkdownShortcutPlugin transformers={TRANSFORMERS} /> */}
      {/* <MyCustomAutoFocusPlugin /> */}
      {/* <ExportPlugin exportAsHTML={exportAsHTML} /> */}
      <ExportPluginJson exportAsJSON={exportAsJson} />
      {/* <ImportPlugin /> */}


    </LexicalComposer>
  );
}

