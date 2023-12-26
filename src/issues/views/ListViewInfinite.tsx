import { useState } from 'react';
import { IssueList } from '../components/IssueList';
import { LabelPicker } from '../components/LabelPicker';
import { useIssuesInfinite } from '../hooks';
import LoadingIcon from '../../shared/components/LoadingIcon';
import { State } from '../interfaces';


export const ListViewInfinite = () => {

  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);

  const [state, setState] = useState<State>();

  const { issuesQuery } = useIssuesInfinite({ labels: selectedLabels, state });

  const onLabelChanged = (labelName: string) => {
    ((selectedLabels.includes(labelName))
      ? setSelectedLabels(selectedLabels.filter(label => label !== labelName))
      : setSelectedLabels([...selectedLabels, labelName])
    )
  }
  return (
    <div className="row mt-5 mb-5">

      <div className="col-8">
        {
          issuesQuery.isLoading
            ? (<LoadingIcon />)
            : (<IssueList issues={issuesQuery.data?.pages.flat() || []} state={state} onStateChanged={(newState) => setState(newState)} />)
        }
        <button onClick={() =>issuesQuery.fetchNextPage()} disabled={issuesQuery.isFetching} className='btn btn-outline-primary mt-2 mb-8'>Load More</button>

      </div>

      <div className="col-4">
        <LabelPicker selectedLabels={selectedLabels}
          onChange={(labelName) => onLabelChanged(labelName)} />
      </div>
    </div>
  )
}
