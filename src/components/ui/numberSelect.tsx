import * as SelectPrimitive from "@radix-ui/react-select";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";

export const NumberSelect = (
  props: SelectPrimitive.SelectProps & { min: number; max: number }
) => (
  <Select {...props}>
    <SelectTrigger>
      <SelectValue placeholder="Select..." />
    </SelectTrigger>
    <SelectContent>
      {[...Array(props.max - props.min + 1).keys()].map((value) => (
        <SelectItem value={(value + props.min).toString()}>
          {(value + props.min).toString()}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);
