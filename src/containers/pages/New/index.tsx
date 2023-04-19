import { PATH, TAKE } from '@constants';
import { Main } from '@containers/layout/Main';
import { Meta } from '@containers/layout/Meta';
import Templates from '@containers/pages/Templates';

const NewPageContent = (props: TemplateResponse) => {
  return (
    <Main
      meta={
        <Meta
          title="Ghepanhdep - New templates"
          description="New templates description"
        />
      }
    >
      <Templates {...props} take={TAKE.TEMPLATE} path={PATH.NEW} />
    </Main>
  );
};

export default NewPageContent;
