import CompanyCard from "./CompanyCard";

export default function CompanyList({
    companies,
    generatingCompanyId,
    onDelete,
    onGenerateLink,
}) {
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {companies.data.map((company, index) => (
                    <CompanyCard
                        key={company.id}
                        company={company}
                        index={index}
                        generatingCompanyId={generatingCompanyId}
                        onDelete={onDelete}
                        onGenerateLink={onGenerateLink}
                    />
                ))}
            </div>

            
        </>
    );
}
