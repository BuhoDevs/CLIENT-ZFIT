import React from "react";
import ReactApexChart from "react-apexcharts";

type ChartProps = {
  // using `interface` is also ok
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any;
};
type ChartState = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  chartData: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  chartOptions: any;
};

class LineChart extends React.Component<ChartProps, ChartState> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(props: { chartData: any[]; chartOptions: any }) {
    super(props);

    this.state = {
      chartData: [],
      chartOptions: {},
    };
  }

  componentDidMount() {
    this.setState({
      chartData: this.props.chartData,
      chartOptions: this.props.chartOptions,
    });
  }

  render() {
    return (
      <ReactApexChart
        options={this.state.chartOptions}
        series={this.state.chartData}
        type="line"
        width="100%"
        height="100%"
      />
    );
  }
}

export default LineChart;
