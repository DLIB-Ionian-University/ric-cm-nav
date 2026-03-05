import data from "./stores/store_data.json";
import * as _ from "lodash";
export const getSession = async () => {
  // const res = await fetch("//jsonplaceholder.typicode.com/users");
  // console.log(data["data"]);
  const input_data = data["data"];
  let ent_list = _.uniq(
    _.map(
      _.filter(input_data.hierarchy, (o) => {
        return o["Child ID"] != null;
      }),
      "Parent ID"
    )
  );
  let hrchy = {};
  for (let i in ent_list) {
    let e = ent_list[i];
    hrchy[e] = [];
    let queue = [e];
    while (queue.length > 0) {
      let en = queue.shift();
      hrchy[e].push(en);
      queue.push(
        ..._.map(
          _.filter(_.filter(input_data.hierarchy, { "Parent ID": en }), (o) => {
            return o["Child ID"] != null;
          }),
          "Child ID"
        )
      );
    }
    hrchy[e].shift();
  }
  input_data["descendants"] = hrchy;

  ent_list = _.uniq(
    _.map(
      _.filter(input_data.hierarchy, (o) => {
        return o["Child ID"] != null;
      }),
      "Child ID"
    )
  );
  hrchy = {};
  for (let i in ent_list) {
    let e = ent_list[i];
    hrchy[e] = [];
    let queue = [e];
    while (queue.length > 0) {
      let en = queue.shift();
      hrchy[e].push(en);
      queue.push(
        ..._.map(
          _.filter(input_data.hierarchy, { "Child ID": en }),
          "Parent ID"
        )
      );
    }
    hrchy[e].shift();
  }
  hrchy["RiC-E01"] = [];

  input_data["ancestors"] = hrchy;

  for (let i in input_data["entities"]) {
    input_data["entities"][i]["attributes"] = [];
    let code = input_data["entities"][i]["ID"];
    input_data["entities"][i]["ancestors"] = [];
    input_data["entities"][i]["relations"] = [];
    let h = _.hasIn(hrchy, code) ? hrchy[code] : [];
    for (let m = h.length - 1; m >= 0; m--) {
      let x = h[m];
      input_data["entities"][i]["ancestors"].push({
        code: x,
        name: _.find(input_data["entities"], {
          ID: x,
        })["Name"],
      });
    }

    let hh = _.cloneDeep(h);
    hh.unshift(input_data["entities"][i]["ID"]);
    for (let e in hh) {
      let x = hh[e];
      let ent_rels = _.map(
        _.filter(input_data["relations"], (o) => {
          return (
            o["DomainID"] == x &&
            o["Relation ID"].charAt(o["Relation ID"].length - 1) != "i"
          );
        }),
        (o) => {
          o["type"] = "Domain";
          o["Domain"] = {
            code: x,
            name: _.find(input_data["entities"], {
              ID: x,
            })["Name"],
          };
          o["Range"] = {
            code: o["RangeID"],
            name: _.find(input_data["entities"], {
              ID: o["RangeID"],
            })["Name"],
          };
          o = _.omit(o, ["DomainID", "RangeID"]);
          return o;
        }
      );
      let tmp_ent_rels = _.filter(ent_rels, { type: "Domain" });
      for (let n in tmp_ent_rels) {
        let r = tmp_ent_rels[n];

        for (let m in _.hasIn(input_data.descendants, r.Range.code)
          ? input_data.descendants[r.Range.code]
          : []) {
          let tmp_r = _.cloneDeep(r);
          tmp_r.Range.code = input_data.descendants[r.Range.code][m];
          tmp_r.Range.name = _.find(input_data.entities, {
            ID: input_data.descendants[r.Range.code][m],
          })["Name"];
          ent_rels.push(tmp_r);
        }
      }

      input_data["entities"][i]["relations"].push(
        ..._.orderBy(_.cloneDeep(ent_rels), ["Relation ID"], ["asc"])
      );

      ent_rels = _.map(
        _.filter(input_data["relations"], (o) => {
          return (
            o["RangeID"] == x &&
            o["Relation ID"].charAt(o["Relation ID"].length - 1) != "i" &&
            o["DomainID"] != o["RangeID"]
          );
        }),
        (o) => {
          o["type"] = "Range";
          o["Domain"] = {
            code: o["DomainID"],
            name: _.find(input_data["entities"], {
              ID: o["DomainID"],
            })["Name"],
          };
          o["Range"] = {
            code: x,
            name: _.find(input_data["entities"], {
              ID: x,
            })["Name"],
          };
          o = _.omit(o, ["DomainID", "RangeID"]);
          return o;
        }
      );

      tmp_ent_rels = _.filter(ent_rels, { type: "Range" });
      for (let n in tmp_ent_rels) {
        let r = tmp_ent_rels[n];

        for (let m in _.hasIn(input_data.descendants, r.Domain.code)
          ? input_data.descendants[r.Domain.code]
          : []) {
          let tmp_r = _.cloneDeep(r);
          tmp_r.Domain.code = input_data.descendants[r.Domain.code][m];
          tmp_r.Domain.name = _.find(input_data.entities, {
            ID: input_data.descendants[r.Domain.code][m],
          })["Name"];
          ent_rels.push(tmp_r);
        }
      }

      input_data["entities"][i]["relations"].push(
        ..._.orderBy(_.cloneDeep(ent_rels), ["Relation ID"], ["asc"])
      );
    }
  }
  let attributes = _.cloneDeep(input_data["attributes"]);
  input_data["attributes"] = [];
  for (let i in attributes) {
    input_data["attributes"].push(attributes[i]);
    input_data["attributes"][i]["entities"] = [];
    for (let j in attributes[i]["Domain"]) {
      let ent_tmp = _.find(input_data["entities"], {
        Name: attributes[i]["Domain"][j],
      });
      input_data["entities"][
        _.findIndex(input_data["entities"], {
          Name: attributes[i]["Domain"][j],
        })
      ]["attributes"].push({
        code: attributes[i]["ID"],
        name: attributes[i]["Name"],
      });

      input_data["attributes"][i]["entities"].push({
        code: ent_tmp["ID"],
        name: ent_tmp["Name"],
      });
    }
  }

  for (let i in input_data["relations"]) {
    let tmp_d = [
      {
        code: input_data["relations"][i]["DomainID"],
        name: _.find(input_data["entities"], {
          ID: input_data["relations"][i]["DomainID"],
        })["Name"],
      },
    ];
    tmp_d.push(
      ...(_.has(
        input_data["descendants"],
        input_data["relations"][i]["DomainID"]
      )
        ? _.map(
            input_data["descendants"][input_data["relations"][i]["DomainID"]],
            (o) => {
              return {
                code: o,
                name: _.find(input_data["entities"], {
                  ID: o,
                })["Name"],
              };
            }
          )
        : [])
    );
    input_data["relations"][i]["DomainEntities"] = tmp_d;
    let tmp_r = [
      {
        code: input_data["relations"][i]["RangeID"],
        name: _.find(input_data["entities"], {
          ID: input_data["relations"][i]["RangeID"],
        })["Name"],
      },
    ];
    tmp_r.push(
      ...(_.has(
        input_data["descendants"],
        input_data["relations"][i]["RangeID"]
      )
        ? _.map(
            input_data["descendants"][input_data["relations"][i]["RangeID"]],
            (o) => {
              return {
                code: o,
                name: _.find(input_data["entities"], {
                  ID: o,
                })["Name"],
              };
            }
          )
        : [])
    );
    input_data["relations"][i]["RangeEntities"] = tmp_r;
  }

  let tmp_rels = _.map(
    _.filter(input_data["relation_descr"], (o) => {
      return o["ID"].charAt(o["ID"].length - 1) != "i";
    }),
    (o) => {
      return {
        code: o["ID"],
        name: o["Name"],
      };
    }
  );

  for (let i in input_data["relation_descr"]) {
    input_data["relation_descr"][i]["BroadRels"] = [];
    for (let j in tmp_rels) {
      if (
        input_data["relation_descr"][i]["Broader relations"].includes(
          tmp_rels[j].code
        )
      ) {
        input_data["relation_descr"][i]["BroadRels"].push({
          code: tmp_rels[j].code,
          name: tmp_rels[j].name,
        });
      }
    }
    input_data["relation_descr"][i]["NarrowRels"] = [];
    for (let j in tmp_rels) {
      if (
        input_data["relation_descr"][i]["Narrower relations"].indexOf(
          tmp_rels[j].code
        ) > -1
      ) {
        input_data["relation_descr"][i]["NarrowRels"].push({
          code: tmp_rels[j].code,
          name: tmp_rels[j].name,
        });
      }
    }
  }

  let tmp_h = _.filter(input_data.hierarchy, (o) => {
    return o["Child ID"] != null;
  });
  let levels = [
    {
      code: "RiC-E01",
      name: "Thing",
      children: _.sortBy(
        _.map(_.filter(tmp_h, { "Parent ID": "RiC-E01" }), (o) => {
          return { code: o["Child ID"], name: o["Child Name"] };
        }),
        ["code"]
      ),
    },
  ];
  for (let l2 in levels[0].children) {
    levels[0]["children"][l2]["children"] =
      _.filter(tmp_h, {
        "Parent ID": levels[0]["children"][l2].code,
      }).length > 0
        ? _.sortBy(
            _.map(
              _.filter(tmp_h, {
                "Parent ID": levels[0]["children"][l2].code,
              }),
              (o) => {
                return { code: o["Child ID"], name: o["Child Name"] };
              }
            ),
            ["code"]
          )
        : [];
    for (let l3 in levels[0]["children"][l2].children) {
      levels[0]["children"][l2]["children"][l3]["children"] =
        _.filter(tmp_h, {
          "Parent ID": levels[0]["children"][l2]["children"][l3].code,
        }).length > 0
          ? _.sortBy(
              _.map(
                _.filter(tmp_h, {
                  "Parent ID": levels[0]["children"][l2]["children"][l3].code,
                }),
                (o) => {
                  return { code: o["Child ID"], name: o["Child Name"] };
                }
              ),
              ["code"]
            )
          : [];
    }
  }
  input_data["ent_hierarchy"] = levels;
  console.log(input_data);
  return input_data;
};
