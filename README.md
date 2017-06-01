# Charting-Library---Angular-1.5-Seed-Project

A basic build of the ChartIQ library within the Angular 1.5.7 framework. This provides an example of how to implement the most common elements in the charting library. This is not a comprehensive example, more like a good starting point for an Angular developer.

## The Structure

This is broken up into three different examples.

### angular-example-1:

>Demonstrates how to implement a chart as an angular component. This example has a preset symbol and shows how to access a "quotefeed" through an angular service. (The quotefeed in this example uses fake market data. You would write a replacement quotefeed to connect with your data).

### angular-example-2:

>Takes example-1 and adds some basic UI. This UI includes shows how to change the symbol, periodicity, and chart type. It demonstrates how to create a toggle control that turns crosshairs of and on. It shows how to add a comparison symbol to a chart.

### angular-example-3:

>Takes example-2 and adds more advanced UI features that require user input (dialogs). This UI demonstrates how to add a study, make custom themes, and change the timezone.

These examples provide a good overview of how to use ChartIQ the "Angular way". Angular components are nested and communicate with each other.

## Requirements

A copy of the ChartIQ library, version 3.0+ is required for this to work out of the box. To get your copy, visit https://www.chartiq.com/products/html5-charting-library/ to see a demo and get in touch with us.

## Getting started

Copy (or symlink) the ChartIQ library's js and css folders inside `chartiq/` as `js` and `css`, respectively.

```sh
npm install # This will install all dependencies
npm start # This will start the local dev server
```

This browser will automatically launch with the url `http://localhost:3000/angular-example-1.html`.
You can change the 1 in `angular-example-1.html` to preview the other examples.

## Questions and support

If you have questions or get stuck using this project or the ChartIQ library, the dev support team can be reached through [dev@chartiq.com](mailto:dev@chartiq.com).

## Contributing to this project

If you wish to contribute to this project, fork it and send us a pull request.
We'd love to see what it is you want to do with our charting tools!
