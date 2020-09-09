const source = [
    {
        value: "北京分行",
        children: [
            {
                value: "朝阳支行办事处",
                children: [
                    {   value: "朝阳支行办事处-1" },
                    {   value: "朝阳支行办事处-2" }
                ]
            },
            {   value: "海淀支行办事处" },
            {  value: "石景山支行办事处" }
        ]
    },
    {
        value: "天津分行",
        children: [
            {   value: "和平支行办事处" },
            {  value: "河东支行办事处" },
            { value: "南开支行办事处" }
        ]
    }
];

const flatten = function(
    list,
    childKey = "children",
    level = 1,
    parent = null,
    defaultExpand = true
) {
    let arr = [];
    list.forEach(item => {
        item.level = level;
        if (item.expand === undefined) {
            item.expand = defaultExpand;
        }
        if (item.visible === undefined) {
            item.visible = true;
        }
        if (!parent.visible || !parent.expand) {
            item.visible = false;
        }
        item.parent = parent;
        arr.push(item);
        if (item[childKey]) {
            arr.push(
                ...flatten(
                    item[childKey],
                    childKey,
                    level + 1,
                    item,
                    defaultExpand
                )
            );
        }
    });
    return arr;
};

console.log(flatten(source,'children',1,{
    level: 0,
    visible: true,
    expand: true,
    children:source
}))
