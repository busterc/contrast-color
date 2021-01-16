const { given, as } = require("jest-given");
const ContrastColor =
  process.env.NODE_ENV === "BUILD"
    ? require("../../dist/contrastColor")
    : require("../");
const { contrastColor } = ContrastColor;

describe("ContrastColor", () => {
  const cc = new ContrastColor({
    bgColor: "red",
    fgDarkColor: "#f0f0f0",
    fgLightColor: "#0f0f0f",
    defaultColor: "#EEEEEE",
    threshold: 129,
    customNamedColors: {
      smiley: "#FFEE00",
    },
  });
  given("an instance").it("returns instantiated results", () => {
    expect(cc.contrastColor()).toBe("#0f0f0f");
    expect(cc.contrastColor({ fgLightColor: "smiley" })).toBe("#FFEE00");
    expect(cc.contrastColor({ bgColor: "INVALID" })).toBe("#EEEEEE");
    expect(cc.namedColors.smiley).toBe("#FFEE00");
  });
});

describe("contrastColor", () => {
  given("no options").it("returns black hex", () => {
    expect(contrastColor()).toBe("#000000");
  });

  given("custom bg color", () => {
    as("3 digit hex").it("returns properly", () => {
      expect(contrastColor({ bgColor: "#f00" })).toBe("#FFFFFF");
    });
    as("4 digit hex").it("returns properly", () => {
      expect(contrastColor({ bgColor: "#cccc" })).toBe("#000000");
    });
    as("6 digit hex").it("returns properly", () => {
      expect(contrastColor({ bgColor: "#ffffffff" })).toBe("#000000");
    });
    as("8 digit hex").it("returns properly", () => {
      expect(contrastColor({ bgColor: "#00000000" })).toBe("#FFFFFF");
    });
    as("invalid name|hex").it("returns defaultColor", () => {
      expect(
        contrastColor({ bgColor: "INVALID", defaultColor: "yellow" })
      ).toBe("#FFFF00");
      expect(
        contrastColor({ bgColor: "INVALID", defaultColor: "#BADBAD" })
      ).toBe("#BADBAD");
    });
  });

  given("custom fg(Dark|Light) color", () => {
    as("named color").it("returns proper hex", () => {
      expect(contrastColor({ fgDarkColor: "red" })).toBe("#FF0000");
      expect(contrastColor({ fgDarkColor: "red" })).toBe("#FF0000");
      expect(contrastColor({ bgColor: "black", fgLightColor: "yellow" })).toBe(
        "#FFFF00"
      );
    });
    as("hex").it("returns proper hex", () => {
      expect(contrastColor({ fgDarkColor: "#ff0000" })).toBe("#ff0000");
    });
  });

  given("custom named colors").it("returns proper hex", () => {
    expect(
      contrastColor({
        customNamedColors: {
          veneer: "#FACADE",
        },
        fgDarkColor: "veneer",
      })
    ).toBe("#FACADE");
  });
});
