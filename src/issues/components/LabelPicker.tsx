import { FC } from "react";
import LoadingIcon from "../../shared/components/LoadingIcon";
import { useLabels } from "../hooks/useLabels"

interface Props {
  selectedLabels: string[];
  onChange: ( labelName: string) => void;
}

export const LabelPicker: FC<Props> = ({selectedLabels, onChange}) => {

  const labelsQuery = useLabels();

  if (labelsQuery.isLoading) {
    return (<LoadingIcon />)
  }
  return (
    <div>
      {
        labelsQuery.data?.map(label => (
          <span
            key={label.id}
            className={`badge rounded-pill m-1 label-picker ${selectedLabels.includes(label.name) ? 'label-active' : ''}`}
            onClick={ () => onChange(label.name)}
            style={{ border: `1px solid #${label.color}`, color: `#${label.color}` }}
          >
            {label.name}
          </span>
        ))
      }
    </div>
  )
}
