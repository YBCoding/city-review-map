const colorTable: Map<number, string> = new Map();
colorTable.set(1, '#ff2800');
colorTable.set(2, '#ff2800');
colorTable.set(3, '#fe5000');
colorTable.set(4, '#fe7800');
colorTable.set(5, '#fea000');
colorTable.set(6, '#fec800');
colorTable.set(7, '#ffff00');
colorTable.set(8, '#c8ff00');
colorTable.set(9, '#50fe00');
colorTable.set(10, '#00fe36');

export function getColor(value : number) {
    return colorTable.get(Math.max(0, Math.min(10,Math.ceil(value))));
}