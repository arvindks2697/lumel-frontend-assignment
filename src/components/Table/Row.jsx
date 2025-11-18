
import * as React from "react"

export const Row = (props) => {
    let row = props.data;
    const [value, setInputValue] = React.useState(0)
    const handleInputChange = (event) => {
        setInputValue(event.currentTarget.value)
    }
    return <tr>
        <td>{(row.parent ? " -- " : "") + row.label}</td>
        <td>{row.value}</td>
        <td><input type="number" id="value" onChange={(e) => handleInputChange(e)} value={value} /></td>
        <td><button onClick={(e) => props.allocate("percent", row, value)} disabled={!row.parent}>Allocate %</button></td>
        <td><button onClick={(e) => props.allocate("value", row, value)}>Allocate Value</button></td>
        <td>{(row.variance ?? 0) + "%"}</td>
    </tr>
}