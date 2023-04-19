import { PATH, TAKE } from '@constants';
import { Main } from '@containers/layout/Main';
import { Meta } from '@containers/layout/Meta';
import Templates from '@containers/pages/Templates';

const TrendingPageContent = (props: TemplateResponse) => {
  return (
    <Main
      meta={
        <Meta
          title="Ghepanhdep - Trending"
          description="Trending description"
        />
      }
    >
      <Templates {...props} take={TAKE.TEMPLATE} path={PATH.TRENDING} />
    </Main>
  );
};

export default TrendingPageContent;
