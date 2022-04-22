import { useParams } from 'react-router';
import { companies } from '../fake-data';

function CompanyDetail() {
  const { companyId } = useParams();

  const company = companies.find((company) => company.id === companyId);
  return (
    <div>
      <h1 className="title">
        {company.name}
      </h1>
      <div className="box">
        {company.description}
      </div>
    </div>
  );
}

export default CompanyDetail;
