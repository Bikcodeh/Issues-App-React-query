import { useState } from 'react';
import { IssueList } from '../components/IssueList';
import { LabelPicker } from '../components/LabelPicker';
import { useIssues } from '../hooks';
import LoadingIcon from '../../shared/components/LoadingIcon';
import { State } from '../interfaces';


export const ListView = () => {

  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);

  const [state, setState] = useState<State>();

  const { issuesQuery, nextPage, prevPage } = useIssues({ labels: selectedLabels, state });

  const onLabelChanged = (labelName: string) => {
    ((selectedLabels.includes(labelName))
      ? setSelectedLabels(selectedLabels.filter(label => label !== labelName))
      : setSelectedLabels([...selectedLabels, labelName])
    )
  }
  return (
    <div className="row mt-5">

      <div className="col-8">
        {
          issuesQuery.isLoading
            ? (<LoadingIcon />)
            : (<IssueList issues={issuesQuery.data || []} state={state} onStateChanged={(newState) => setState(newState)} />)
        }
        <div className='d-flex justify-content-between mt-2'>
          <button onClick={() => prevPage()} disabled={issuesQuery.isFetching} className='btn btn-outline-primary'>Prev</button>
          <span>1</span>
          <button onClick={() => nextPage()} disabled={issuesQuery.isFetching} className='btn btn-outline-primary'>Next</button>
        </div>
      </div>

      <div className="col-4">
        <LabelPicker selectedLabels={selectedLabels}
          onChange={(labelName) => onLabelChanged(labelName)} />
      </div>
    </div>
  )
}
