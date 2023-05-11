# CS373 IDB - findacarfor.me

[[_TOC_]]

#### Group Information
11 AM - Group 7 - Maxine

| Name              |   EID     | GitLab ID     | Roles
| ------            |  ------   |  ------       | ------
| Varun Jawarani    | vj3877    | vjawarani     | Phase II Leader
| Trent Ho          | tth727    | trentho       |
| James Stuedemann  | js95655   | jbstuedemann  | Phase III Leader
| Jatin Kulkarni    | jsk2597   | j10.kulkarni  | Phase I Leader
| Taqi Hossain      | th32857   | taqi1         |

Pipelines: https://gitlab.com/vjawarani/cs373-idb/-/pipelines

Project URL: https://findacarfor.me

#### Phase Leader Responsibilites
 - leading design
 - overseeing issues
 - peer-reviewing requests
 - assigning tasks to developers

## Phase I

### Git SHA
582b1e5664cc202a70bb19c5d04913b7aed8c984

#### Leader

Jatin Kulkarni

#### Estimated Completion Time in Hours

| Name              |   Time    |
| ------            |  ------   |
| Varun Jawarani    | 22        |
| Trent Ho          | 35        |
| James Stuedemann  | 25        |
| Jatin Kulkarni    | 18        |
| Taqi Hossain      | 30        |

#### Actual Completion Time in Hours

| Name              |   Time    |
| ------            |  ------   |
| Varun Jawarani    | 20        |
| Trent Ho          | 20        |
| James Stuedemann  | 20        |
| Jatin Kulkarni    | 21        |
| Taqi Hossain      | 19        |      


## Phase II
### Git SHA
f0446c7095e76f787048c57c5d90f05b2efa4cb7 (resubmit)

#### Leader

Varun Jawarani

#### Estimated Completion Time in Hours

| Name              |   Time    |
| ------            |  ------   |
| Varun Jawarani    | 32        |
| Trent Ho          | 35        |
| James Stuedemann  | 35        |
| Jatin Kulkarni    | 40        |
| Taqi Hossain      | 40        |

#### Actual Completion Time in Hours

| Name              |   Time    |
| ------            |  ------   |
| Varun Jawarani    | 25        |
| Trent Ho          | 25        |
| James Stuedemann  | 30        |
| Jatin Kulkarni    | 30        |
| Taqi Hossain      | 29        |   


## Phase III
### Git SHA

5b87730d404b18ee13afec6054c21e5fd41401fc (resubmit)

#### Leader

James Stuedemann

#### Estimated Completion Time in Hours

| Name              |   Time    |
| ------            |  ------   |
| Varun Jawarani    | 20        |
| Trent Ho          | 17        |
| James Stuedemann  | 30        |
| Jatin Kulkarni    | 25        |
| Taqi Hossain      | 20        |

#### Actual Completion Time in Hours

| Name              |   Time    |
| ------            |  ------   |
| Varun Jawarani    | 15        |
| Trent Ho          | 15        |
| James Stuedemann  | 25        |
| Jatin Kulkarni    | 28        |
| Taqi Hossain      | 17        |   

## Project Information

While listing aggregators are already a consistent element of purchasing a vehicle—and while they provide thorough specifications on each make and model in the listing—there exists an inherent bias in a for-profit aggregator that [findacarfor.me](https://findacarfor.me) attempts to remove, especially with its dual focus on frugality and safety. Our product will be that comprehensive source for car buyers through its: location-specific listings and fuel stations, in-depth safety comparison for vehicles, and composite cost-to-purchase overview. Our intended (but not entire) audience are users with questions like the following:
- What are listings near me that fulfill my criteria (make, model, safety, etc.)
    - How much will I spend on fuel if I drive *x* miles weekly?
- Is my surrounding area properly equipped for my purchase of an electric vehicle?
    - What types of fuel are less expensive in my area?
- What is the safest and most budget-friendly car for my son?
    - Where can I purchase affordable vehicles nearby?

#### Our Data Sources

- [openchargemap](https://openchargemap.org/site/develop/api#/)
- [Google Places](https://developers.google.com/maps/documentation/places/web-service/cloud-setup)
- [NHTSA](https://vpic.nhtsa.dot.gov/api/)
- [CIS](http://autodealerdata.com/)


#### Information on our Backend
- can be found here at our [Postman:](https://documenter.getpostman.com/view/23628441/2s83tJGqha) 
- and here at our [database diagram in this repo:](https://gitlab.com/vjawarani/cs373-idb/-/blob/f6b1aa076b827b370981c6e0f98836ea48704364/database_diagram.pdf) *Note, GitLab's PDF view is a little glitchy, but downloading the PDF should work*

#### Our Three Models

There are presently three models to compare vehicles with: fuel stations (EV charging and gasoline); car specifications by make, model, and year; and car listings from nearby dealerships. All the models are strongly related, with attributes to filter and sort on. Fuel stations are relevant to a consumer’s decision between an EV and a gasoline-powered car, and they also expand on the cost-per-vehicle with fuel prices. Yearly car models are useful for general specifications and price averages, and to compare potential vehicles on a broad scale before seeking individual listings. The listings are often the final barrier for a car buyer, and we aim to clarify the process by supplementing the listings with fuel and vehicle information on the consumer’s location.

#### Major Questions We Aim to Answer

- **Which car is the best option for you based on your location?**

- **Which cars are the most financially stable/efficient?**

- **Which car manufacturers, models, and listings have the specific features you want?**

