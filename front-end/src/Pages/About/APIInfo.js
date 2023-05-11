
// change kbb information since they rejected us lol
import cis from "./Tools_And_Api/cisauto.png";
import nhtsa from "./Tools_And_Api/nhtsa.png";
import googleplaces from "./Tools_And_Api/googleplaces.png";
import opencharge from "./Tools_And_Api/opencharge.png";


const APIInfo = [
    {
        name: "CIS Automotive API",
        image: cis,
		description: "The CIS Automotive API is a RESTful API that provides access to vehicle data. The API is used to retrieve vehicle data such as make, model, trim, and options. The API also provides access to vehicle images, pricing, and warranty information. We used this API to get a json file. We then used the json file to get the information we needed to display on our website.",
        link: "https://autodealerdata.com/",
    },
    {
        name: "NHTSA Vehicle API",
        image: nhtsa,
        description: "The NHTSA API is used to retrieve vehicle safety data. The API is used to retrieve vehicle safety ratings, recall information, and crash test results. We used this API to get a json file. We then used the json file to get the information we needed to display on our website.",
        link: "https://vpic.nhtsa.dot.gov/api/",
    },
    {
        name: "Google Places API",
        image: googleplaces,
        description: "We will use the Google Places API to get information about the fueling stations near the user's location. We have not actually used this API yet.",
        link: "https://developers.google.com/places/web-service/overview",
    },
    {
        name: "Open Charge Map API",
        image: opencharge,
        description: "This will be our EV charging station backup. In case the Google Places API doesn't work, we will use this API to get information about the charging stations near the user's location. We have not actually used this API yet.",
        link: "https://openchargemap.org/site/develop/api",
    }

]

export default APIInfo;
