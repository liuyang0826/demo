const defaultOpts = {
  // required opts
  Vue: null,
  appOptions: () => ({}),
  template: null
};

function bootstrap(opts) {
  if (opts.loadRootComponent) {
    return opts.loadRootComponent().then(root => opts.rootComponent = root);
  } else {
    return Promise.resolve();
  }
}

function mount(opts, mountedInstances, props) {
  return Promise
  .resolve()
  .then(() => {
    const appOptions = { ...opts.appOptions() };
    if (props.domElement && !appOptions.el) {
      appOptions.el = props.domElement;
    }

    if (!appOptions.el) {
      const htmlId = `micro-core-application:${props.name}`;
      appOptions.el = `#${htmlId.replace(":", "\\:")} .micro-core-container`;
      let domEl = document.getElementById(htmlId);
      if (!domEl) {
        domEl = document.createElement("div");
        domEl.id = htmlId;
        document.body.appendChild(domEl);
      }

      // micro-core-vue@>=2 always REPLACES the `el` instead of appending to it.
      // We want domEl to stick around and not be replaced. So we tell Vue to mount
      // into a container div inside of the main domEl
      if (!domEl.querySelector(".micro-core-container")) {
        const singleSpaContainer = document.createElement("div");
        singleSpaContainer.className = "micro-core-container";
        domEl.appendChild(singleSpaContainer);
      }

      mountedInstances.domEl = domEl;
    }

    if (!appOptions.render && !appOptions.template && opts.rootComponent) {
      appOptions.render = (h) => h(opts.rootComponent);
    }

    if (!appOptions.data) {
      appOptions.data = {};
    }

    appOptions.data = { ...appOptions.data, ...props };

    mountedInstances.instance = new opts.Vue(appOptions);
    if (mountedInstances.instance.bind) {
      mountedInstances.instance = mountedInstances.instance.bind(mountedInstances.instance);
    }
  });
}

function unmount(_, mountedInstances) {
  return Promise
  .resolve()
  .then(() => {
    mountedInstances.instance.$destroy();
    mountedInstances.instance.$el.innerHTML = "";
    delete mountedInstances.instance;

    if (mountedInstances.domEl) {
      mountedInstances.domEl.innerHTML = "";
      delete mountedInstances.domEl;
    }
  });
}

export function adapterVue(userOpts) {
  if (typeof userOpts !== "object") {
    throw new Error(`micro-core-vue requires a configuration object`);
  }

  const opts = {
    ...defaultOpts,
    ...userOpts
  };

  if (!opts.Vue) {
    throw new Error("micro-core-vuejs must be passed opts.Vue");
  }

  if (!opts.appOptions) {
    throw new Error("micro-core-vuejs must be passed opts.appOptions");
  }

  // Just a shared object to store the mounted object state
  const mountedInstances = {};

  return {
    bootstrap: bootstrap.bind(null, opts, mountedInstances),
    mount: mount.bind(null, opts, mountedInstances),
    unmount: unmount.bind(null, opts, mountedInstances)
  };
}
