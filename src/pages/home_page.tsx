import AppButton from "../components/app_button";


function home_page() {
    return (
        <>
            <div className="flex items-center justify-center m-10 bg-pink-600 h-25">
                <h1 className="text-3xl font-bold">The Pomodoro App</h1>
            </div>

            <div className="flex items-center justify-center m-10 bg-red-900 h-80">
                <div className="flex">
                    <p className="m-10 text-3xl font-bold text-white">
                        Graph Section
                    </p>
                </div>
                <div className="flex">
                    <AppButton color={"pink"} isDisabled={false} textInside={""}/>
                    <AppButton color={"pink"} isDisabled={false} textInside={""}/>
                    <AppButton color={"pink"} isDisabled={false} textInside={""}/>
                </div>
            </div>
        </>
    );
}

export default home_page;
