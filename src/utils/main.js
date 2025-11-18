export const normalizeTableData = (data, parent) => {
    const tableData = [];
    let count = 0
    while (data.length > count) {
        const row = data[count]
        const rowData = {
            "id": row.id,
            "label": row.label,
            "value": row.value,
        }
        if (parent) rowData.parent = parent;
        tableData.push(rowData)
        if (row.children && row.children.length > 0) {
            tableData.push(...normalizeTableData(row.children, row.id))
        }
        count++;
    }
    return tableData;
}

export const recalculateTableData = (data, row, type, value = 0) => {
    if (type == "percent") {
        let varValue = (row.value * value / 100);
        row.variance = value
        if (row.parent) {
            const parent = data.find((a) => a.id == row.parent);
            if (parent) {
                const parentVarValue = parent.value + varValue;
                parent.variance = parseFloat((parentVarValue - parent.value) / parent.value * 100).toFixed(2)
                parent.value = Math.round(parentVarValue).toFixed(2)
            }
        }
        row.value = Math.round((row.value + varValue).toFixed(2))
    }

    if (type == "value") {
        const valueDifference = (value - row.value);
        const varPercent = (valueDifference / row.value * 100);
        row.variance = varPercent;
        if (row.parent) {
            const parent = data.find((a) => a.id == row.parent);
            if (parent) {
                const parentVarValue = parent.value + valueDifference;
                parent.variance = parseFloat((parentVarValue - parent.value) / parent.value * 100).toFixed(2)
                parent.value = Math.round(parentVarValue.toFixed(2))
            }
        } else {
            const children = data.filter((a) => a.parent === row.id)
            if (children && children.length > 0) {
                children.map((child) => {
                    const percentFromParent = child.value / row.value * 100;
                    const childValue = value * percentFromParent / 100;
                    const originalValue = child.value;
                    child.variance = parseFloat((childValue - originalValue) / originalValue * 100).toFixed(2)
                    child.value = Math.round(childValue.toFixed(2));
                })
            }
        }
        row.value = row.value + valueDifference;
        row.input = null
    }

    return data;
}