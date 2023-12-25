import { useQuery } from '@tanstack/react-query';
import { githubApi } from '../../api/githubApi'
import { Label } from '../interfaces/label'
import { sleep } from '../../helpers/sleep';

const getLabels = async (): Promise<Label[]> => {
    await sleep(2);
    const { data } = await githubApi.get<Label[]>('/labels');
    return data;
}

export const useLabels = () => {
    const labelsQuery = useQuery(
        {
            queryKey: ['labels'],
            queryFn: getLabels,
            staleTime: 1000 * 60 * 60, // Keep data fresh for an hour,
            placeholderData: [
                {
                    id: 717031390,
                    node_id: "MDU6TGFiZWw3MTcwMzEzOTA=",
                    url: "https://api.github.com/repos/facebook/react/labels/good%20first%20issue",
                    name: "good first issue",
                    color: "6ce26a",
                    default: "true"
                },
                {
                    id: 717031392,
                    node_id: "MDU6TGFiZWw3MTcwMzEzOTA=",
                    url: "https://api.github.com/repos/facebook/react/labels/good%20first%20issue",
                    name: "good first issue",
                    color: "6ce26a",
                    default: "true"
                }
            ]
        },
    );

    return labelsQuery;
}