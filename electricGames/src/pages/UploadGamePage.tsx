import UploadGame from "../components/games/UploadGame";

const UploadGamePage = () => {
    return (
        <section className="text-uppercase fw-bold">
            <h1 className="display-1 fw-bold text-uppercase" style={{ paddingTop: '2rem' }}>Upload Game</h1>
            <UploadGame />
        </section>
    )
}

export default UploadGamePage;