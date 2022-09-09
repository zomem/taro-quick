import React from "react"
import InnerRadio, { RadioProps } from "./InnerRadio"
import Group from "./Group"

export interface CompoundedRadio extends React.FC<RadioProps> {
  Group: typeof Group
}

const Radio = InnerRadio as CompoundedRadio
Radio.Group = Group


export default Radio