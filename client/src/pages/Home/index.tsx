//components
import Header from '../../components/Header';
import QuestionsTable from '../../components/Table';

//check if challenges
//all challenges
import useChallenges from '../../hooks/useChallenges';
const HomePage = () => {
    const allChallenges = useChallenges();
    return (
        <>
            <Header />
            <section className="text-emerald-900 mt-8">
                {allChallenges ? (
                    <h2 className="text-lg font-semibold capitalize my-2">
                        Coding Questions
                    </h2>
                ) : null}
                <QuestionsTable />
            </section>
        </>
    );
};

export default HomePage;
