import React from "react"
import InnerCheckbox, {CheckboxProps} from "./innerCheckbox"
import Group from "./Group"

export interface CompoundedCheckbox extends React.ReactElement<CheckboxProps> {
  Group: typeof Group
}

const Checkbox = InnerCheckbox as unknown as CompoundedCheckbox
Checkbox.Group = Group


export default Checkbox