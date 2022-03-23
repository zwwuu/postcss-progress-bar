module.exports = opts => {
  const strict = opts && 'strict' in opts ? Boolean(opts.strict) : false;

  const progressBar = {
    'prefix': '::progress-bar', 'pseudo': ['::-webkit-progress-bar'],
  };
  const progressValue = {
    'prefix': '::progress-value', 'pseudo': ['::-webkit-progress-value', '::-moz-progress-bar'],
  };

  return {
    postcssPlugin: 'postcss-progress-bar',
    Once(root, {Rule}) {
      root.walkRules(rule => {
        if (rule.selector.includes(progressBar.prefix)) {
          let newRules = [];
          for (let i = 0; i < progressBar.pseudo.length; i++) {
            newRules.push(new Rule({
              selector: rule.selector.replace(progressBar.prefix, progressBar.pseudo[i]),
              nodes: rule.nodes,
            }));
          }
          rule.replaceWith(newRules);

          if (!strict) {
            let parentSelector = rule.selector.replace(progressBar.prefix, '').trim();
            if (parentSelector.length) {
              let parentRule = new Rule({
                selector: parentSelector,
                nodes: rule.nodes,
              });

              root.insertBefore(rule, parentRule);
            }
          }
        }

        if (rule.selector.includes(progressValue.prefix)) {
          let newRules = [];
          for (let i = 0; i < progressValue.pseudo.length; i++) {
            newRules.push(new Rule({
              selector: rule.selector.replace(progressValue.prefix, progressValue.pseudo[i]),
              nodes: rule.nodes,
            }));
          }
          rule.replaceWith(newRules);
        }
      });
    },
  };
};

module.exports.postcss = true;
