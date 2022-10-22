const { Client } = require("@notionhq/client");
const { NotionToMarkdown } = require("notion-to-md");


// 命令行解析工具
const { program } = require('commander');

// 设置选项
program
    .version('0.1.0')
    .option('-u, --url [url]', 'Notion页面的URL链接')
    .option('-f, --file [fileName]', '输出文件名称');

// 解析
program.parse(process.argv);
const options = program.opts();


/**  帮助方法   **/
// 按照s切分字符串，并且获取数组最后一个元素
function getLastElementBySplit(a,s) {
    return a.split(s)[a.split(s).length-1];
}


if (options.url) {
    // NotionJS客户端
    const notion = new Client({
        auth: "secret_51bHCRJaG6NQihYw37Gt8ReWdbNhgsuQWzAQriZ8Gns",
    });
    // passing notion client to the option
    const n2m = new NotionToMarkdown({ notionClient: notion });

    // 获取页面id
    const pageId = getLastElementBySplit(getLastElementBySplit(options.url,'/'),'-')

    // 获取输出文件名称
    let fileName = "Notion_output.md";
    if (options.file) {
        if (options.file.endsWith(".md")) {
            fileName = options.file;
        } else {
            fileName = options.file + ".md";
        }
    }

    // 执行转换
    (async () => {
        // notice second argument, totalPage.
        // checkout API section to know more about totalPage
        const x = await n2m.pageToMarkdown(pageId);
        const mdString = n2m.toMarkdownString(x);
        console.log(mdString)
    })();

    // console.log(`Hello, ${pageId}! ${fileName}`);
}










