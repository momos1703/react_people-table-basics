import { useParams } from 'react-router-dom';
import { Person } from '../../../types';
import classNames from 'classnames';
interface Props {
  person: Person;
  parentsSlugs: {
    mother: string;
    father: string;
  };
}

const addWomenNameClass = (sex: string) =>
  classNames({
    'has-text-danger': sex === 'f',
  });

export const PersonLink: React.FC<Props> = ({ person, parentsSlugs }) => {
  const { selectedName } = useParams();

  return (
    <tr
      data-cy="person"
      key={person.slug}
      className={classNames({
        'has-background-warning': selectedName === person.slug,
      })}
    >
      <td>
        <a
          className={addWomenNameClass(person.sex)}
          href={`#/people/${person.slug}`}
        >
          {person.name}
        </a>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {!person.motherName && '-'}

        {person.motherName && !parentsSlugs.mother && `${person.motherName}`}

        {person.motherName && parentsSlugs.mother && (
          <a
            className="has-text-danger"
            href={`#/people/${parentsSlugs.mother}`}
          >
            {person.motherName}
          </a>
        )}
      </td>
      <td>
        {!person.fatherName && '-'}

        {person.fatherName && !parentsSlugs.father && `${person.fatherName}`}

        {person.fatherName && parentsSlugs.father && (
          <a href={`#/people/${parentsSlugs.father}`}>{person.fatherName}</a>
        )}
      </td>
    </tr>
  );
};