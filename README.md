# Charting-Library---Angular-1.5-Seed-Project

A basic build of the ChartIQ library within the Angular 1.5.7 framework. This provides an example of how to implement the most common elements in the library. This is not a comprehensive example, more like a good starting point for an Angular developer.

## The Structure

This is broken up into three different examples.

### angular-example-1:
	a basic chart with a preset symbol and the demo quote feed attached through an angular service.

### angular-example-2:
	example-1 with the addition of some basic UI. This UI includes an example on how to change the symbol, the periodicity, the chart type, toggle the crosshairs, and add a comparison.

### angular-example-3:
	example-2 with the addition of slightly more advanced UI features. This UI adds examples of how to add a study, make custom themes, and change the timezone.

These examples provide a good overview of how to nest the library components and communicate between the different parts of the app using Angular.

## Requirements

A copy of the ChartIQ library. To get your copy, visit https://www.chartiq.com/products/html5-charting-library/ to see a demo and get in touch with us.

## Getting started

In app.js, change the baseUrl to match the path of your ChartIQ js folder. This is how require.js knows where to start looking for the required files.
