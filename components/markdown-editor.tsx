import { Crepe, CrepeFeature } from "@milkdown/crepe";
import "@milkdown/crepe/theme/common/style.css";
import "@milkdown/crepe/theme/frame.css";
import { insert } from "@milkdown/kit/utils";
import {
    forwardRef,
    useEffect,
    useId,
    useImperativeHandle,
    useRef,
} from "react";

interface IProps {
    markdown: string;
}

export interface IMarkdownEditorRef {
    getMarkdown: () => string | undefined;
    insertMarkdown: (markdown: string) => void;
}

const MarkdownEditor: React.ForwardRefRenderFunction<
    IMarkdownEditorRef,
    IProps
> = ({ markdown }, ref) => {
    const hasInitialized = useRef(false); // 用来防止重复调用
    const markdownInstance = useRef<Crepe>(null);
    const id = useId().replace(/:/g, "-");

    useImperativeHandle(ref, () => {
        return {
            getMarkdown,
            insertMarkdown,
        };
    });

    const createMarkdown = () => {
        return new Crepe({
            root: "#" + id,
            defaultValue: markdown,
            featureConfigs: {
                [CrepeFeature.ImageBlock]: {
                    async onUpload(file) {
                        console.log("🚀 ~ onUpload ~ file:", file);

                        return "https://img95.699pic.com/photo/50038/1181.jpg_wh860.jpg";
                    },
                },
            },
        });
    };

    const insertMarkdown = (markdown: string) => {
        markdownInstance.current?.editor?.action(insert(markdown));
    };

    const getMarkdown = () => {
        return markdownInstance.current?.getMarkdown();
    };

    useEffect(() => {
        if (!hasInitialized.current) {
            // @ts-ignore
            markdownInstance.current = createMarkdown();
            Promise.resolve(markdownInstance.current).then((markdown) => {
                markdown.create();
            });
            hasInitialized.current = true; // 标记为已初始化
        }
    }, []);

    return <div id={id} />;
};

MarkdownEditor.displayName = "MarkdownEditor";

export default forwardRef(MarkdownEditor);
