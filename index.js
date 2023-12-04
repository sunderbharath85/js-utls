const data = require("./Untitled-2.json");
// function flattenComponents(components) {
//   let flatArray = [];

//   function extractComponents(components) {
//     if (!Array.isArray(components)) {
//       return;
//     }

//     for (const component of components) {
//       flatArray.push(component);

//       // Check and extract nested components in 'components' property
//       if (component.components) {
//         extractComponents(component.components);
//       }

//       // Check and extract nested components in 'tabs' property
//       if (component.properties.tabs) {
//         component.properties.tabs.forEach((tab) => {
//           if (tab.components) {
//             extractComponents(tab.components);
//           }
//         });
//       }

//       // Check and extract nested components in 'container' property
//       if (component.container && component.container.components) {
//         extractComponents(component.container.components);
//       }

//       // Add similar checks for any other specific properties that may contain nested components
//     }
//   }

//   extractComponents(components);
//   return flatArray;
// }

// // Usage example
// // Assuming 'data' is your JSON data object and it has a 'components' array
// const flattenedComponents = flattenComponents(data.components);
// console.log(flattenedComponents);
// function flattenComponents(components) {
//   let flatArray = [];

//   function extractComponents(obj) {
//     if (Array.isArray(obj)) {
//       obj.forEach((item) => {
//         if (item && typeof item === "object") {
//           flatArray.push(item);
//           extractComponents(item);
//         }
//       });
//     } else if (obj && typeof obj === "object") {
//       Object.values(obj).forEach((value) => {
//         if (typeof value === "object") {
//           extractComponents(value);
//         }
//       });
//     }
//   }

//   extractComponents(components);
//   return flatArray;
// }

// // Usage example
// // Assuming 'data' is your JSON data object and it has a 'components' array
// const flattenedComponents = flattenComponents(data.components);
// console.log(flattenedComponents);

function findComponentByDataPath(components, dataPath) {
  let foundComponent = null;

  function searchComponents(obj) {
    if (Array.isArray(obj)) {
      for (const item of obj) {
        if (item && typeof item === "object") {
          if (item.properties && item.properties.dataPath === dataPath) {
            foundComponent = item;
            break;
          }
          searchComponents(item);
        }
      }
    } else if (obj && typeof obj === "object") {
      Object.values(obj).forEach((value) => {
        if (typeof value === "object" && !foundComponent) {
          searchComponents(value);
        }
      });
    }
  }

  searchComponents(components);
  return foundComponent;
}

// Usage example
// Assuming 'data' is your JSON data object and it has a 'components' array
const component = findComponentByDataPath(
  data.components,
  "caseDetails.reporterInfo.otherIndividuals"
);
if (component) {
  console.log("Component found:", component);
} else {
  console.log("Component not found");
}
