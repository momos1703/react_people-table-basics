import { useEffect, useState } from 'react';
import { getPeople } from '../../api';
import { Loader } from '../../components/Loader';
import { PeopleTable } from '../../components/PeopleTable';
import { Person } from '../../types';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setErrorMessage('');

    getPeople()
      .then(setPeople)
      .catch(loadingError => {
        setErrorMessage('Something went wrong');

        throw loadingError;
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="box table-container">
        {loading ? (
          <Loader />
        ) : (
          <>
            {errorMessage.length > 0 ? (
              <p data-cy="peopleLoadingError" className="has-text-danger">
                {errorMessage}
              </p>
            ) : (
              <PeopleTable peopleList={people} />
            )}
          </>
        )}
      </div>
    </>
  );
};
