# Charting-Library---Angular-1.5-Seed-Project

A basic build of the ChartIQ library within the Angular 1.5.7 framework. This provides an example of how to implement the most common elements in the charting library. This is not a comprehensive example, more like a good starting point for an Angular developer.

## The Structure

This is broken up into three different examples.

### angular-example-1:
	Demonstrates how to implement a chart as an angular component. This example has a preset symbol and shows how to access a "quotefeed" through an angular service. (The quotefeed in this example uses fake market data. You would write a replacement quotefeed to connect with your data).

### angular-example-2:
	Takes example-1 and adds some basic UI. This UI includes shows how to change the symbol, periodicity, and chart type. It demonstrates how to create a toggle control that turns crosshairs of and on. It shows how to add a comparison symbol to a chart.

### angular-example-3:
	Takes example-2 and adds more advanced UI features that require user input (dialogs). This UI demonstrates how to add a study, make custom themes, and change the timezone.

These examples provide a good overview of how to use ChartIQ the "Angular way". Angular components are nested and communicate with each other.

## Requirements

A copy of the ChartIQ library. To get your copy, visit https://www.chartiq.com/products/html5-charting-library/ to see a demo and get in touch with us.

## Getting started

In app.js, change the baseUrl to match the path of your ChartIQ js folder. This is how require.js knows where to start looking for the required files.
