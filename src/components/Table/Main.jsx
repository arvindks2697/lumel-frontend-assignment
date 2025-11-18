import * as React from "react";
import tableData from "../../data/table.json"
import { normalizeTableData, recalculateTableData } from "../../utils/main";
import { Row } from "./Row";
export const TableComponent = () => {
    const [data, setData] = React.useState([]);
    const handleAllocation = (type, row, value) => {
        if (!value) return;
        const reData = recalculateTableData(data, row, type, value);
        setData([...reData])
    }
    React.useEffect(() => {
        let processedTableData = normalizeTableData(tableData.rows);
        setData(processedTableData)
    }, [])

    return <>
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Label</th>
                        <th>Value</th>
                        <th>Input</th>
                        <th>Allocation %</th>
                        <th>Allocation Val</th>
                        <th>Variance %</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((row, id) => <Row key={row.id + id} allocate={handleAllocation} data={row} />)
                    }

                    {/* {data.map((row, id) => {
                        return <tr key={row.id + id}>
                            <td>{row.parent ? " -- " : "" + row.label}</td>
                            <td>{row.value}</td>
                            <td><input type="number" id="value" onChange={(e) => handleInputChange(e)}></input></td>
                            <td><button onClick={(e) => handleAllocation("percent", row)} disabled={!row.parent}>Allocate %</button></td>
                            <td><button onClick={(e) => handleAllocation("value", row)}>Allocate Value</button></td>
                            <td>{(row.variance ?? 0) + "%"}</td>
                        </tr>
                    })} */}
                </tbody>
            </table>
        </div>
    </>
}