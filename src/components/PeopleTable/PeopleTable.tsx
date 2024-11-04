import { Person } from '../../types';
import { PersonLink } from './PersonLink';

interface Props {
  peopleList: Person[];
}

export const PeopleTable: React.FC<Props> = ({ peopleList }) => {
  const findAvailibleParentsSlug = (parent: Person) => {
    return {
      mother:
        peopleList.find(person => person.name === parent.motherName)?.slug ||
        '',
      father:
        peopleList.find(person => person.name === parent.fatherName)?.slug ||
        '',
    };
  };

  return (
    <>
      {peopleList.length === 0 ? (
        <p data-cy="noPeopleMessage">There are no people on the server</p>
      ) : (
        <table
          data-cy="peopleTable"
          className="table is-striped is-hoverable is-narrow is-fullwidth"
        >
          <thead>
            <tr>
              <th>Name</th>
              <th>Sex</th>
              <th>Born</th>
              <th>Died</th>
              <th>Mother</th>
              <th>Father</th>
            </tr>
          </thead>

          <tbody>
            {peopleList.map(person => {
              const parentsSlugs = findAvailibleParentsSlug(person);

              return <PersonLink person={person} parentsSlugs={parentsSlugs} key={person.slug} />;
            })}
            {/* {peopleList.map(person => (
              <PersonLink person={person} peopleList={peopleList} />
            ))} */}
          </tbody>
        </table>
      )}
    </>
  );
};
