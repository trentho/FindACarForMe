import { render, screen, within} from "@testing-library/react";
import { MemoryRouter } from 'react-router-dom';

// import components
import Splash from "./Pages/Splash.js";
import Model1 from "./Pages/Model1.js";
import Model2 from "./Pages/Model2.js";
import Model3 from "./Pages/Model3.js";
import About from "./Pages/About/About.js";
import NavBar from "./Components/NavBar.js";

// test splash page
describe(Splash, () => {
    it ("should render title properly", () => {
        render(<Splash/>, {wrapper: MemoryRouter});
        const title = screen.getByText("Find A Car For Me");
        expect(title).toBeDefined();
    });

    it ("should render splash cards properly", () => {
        render(<Splash/>, {wrapper: MemoryRouter});
        const sCard1 = screen.getByTestId("sCard1");
        expect(sCard1).toBeDefined();
    });
});

// test model 1 page
describe(Model1, () => {
    it ("should render cards properly", () => {
        render(<Model1/>, {wrapper: MemoryRouter});
        const cards = screen.getByTestId("M1cards");
        expect(cards).toBeDefined();
    });
});

// test model 2 page
describe(Model2, () => {
    it ("should render cards properly", () => {
        render(<Model2/>, {wrapper: MemoryRouter});
        const cards = screen.getByTestId("M2cards");
        expect(cards).toBeDefined();
    });
});

// test model 3 page
describe(Model3, () => {
    it ("should render cards properly", () => {
        render(<Model3/>, {wrapper: MemoryRouter});
        const cards = screen.getByTestId("M3cards");
        expect(cards).toBeDefined();
    });
});

// test about page
describe(About, () => {
    it ("should render properly", () => {
        render(<About/>, {wrapper: MemoryRouter});
        const abtPage = screen.getByTestId("abtPage");
        expect(abtPage).toBeDefined();
    });
});

// test NavBar
describe(NavBar, () => {
    it ("should render properly", () => {
        render(<NavBar/>, {wrapper: MemoryRouter});
        const navBar = screen.getByTestId("navBar");
        const navBarTitle = within(navBar).getByTestId("navBarTitle");
        expect(navBar).toBeDefined();
    });
    it ("should render title properly", () => {
        render(<NavBar/>, {wrapper: MemoryRouter});
        const navBar = screen.getByTestId("navBar");
        const navBarTitle = within(navBar).getByTestId("navBarTitle");
        expect(navBarTitle).toBeDefined();
        expect(navBarTitle.innerHTML).toBe("Find A Car For Me");
    });
    it ("should render model titles properly", () => {
        render(<NavBar/>, {wrapper: MemoryRouter});
        const navBar = screen.getByTestId("navBar");
        const navBarLinks = within(navBar).getByTestId("navBarLinks");
        expect(navBarLinks).toBeDefined();
    });
});
