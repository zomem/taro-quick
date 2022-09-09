import React from "react"
import InnerCheckbox, {CheckboxProps} from "./innerCheckbox"
import Group from "./Group"

export interface CompoundedCheckbox extends React.FC<CheckboxProps> {
  Group: typeof Group
}

const Checkbox = InnerCheckbox as CompoundedCheckbox
Checkbox.Group = Group


export default Checkbox