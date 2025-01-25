# node-clinic-doctor-examples

I'm using this subdirectory to learn Clinic.js. You can find the [`Angular-Complete-Course`](https://github.com/ZeroaNinea/Angular-Complete-Course/tree/main/jasmine-karma-documentation) repository here.

I used the [official documentation](https://clinicjs.org/documentation/) to learn Clinic.js.

Server examples for `clinic`

```bash
git clone git@github.com:nearform/node-clinic-doctor-examples.git
cd node-clinic-doctor-examples
npm install
npm install -g clinic
npm install -g autocannon

```

## Examples

### Event Loop

```bash
clinic doctor --autocannon [ / ] -- node slow-event-loop

```

### GC

```bash
clinic doctor --autocannon [ -c 2500 / ] -- node slow-gc

```

### I/O

```bash
clinic doctor --autocannon [ / ] -- node slow-io

```

### Sync I/O

```bash
clinic doctor --autocannon [ / ] -- node sync-io

```

Replace `show-event-loop` with your file. Run Clinic Doctor with a report and automatically define the port:

```bash
clinic doctor --on-port 'autocannon localhost:$PORT' -- node slow-event-loop
```

Find the slowest part of code:

```bash
clinic flame --on-port 'autocannon localhost:$PORT' -- node slow-event-loop
```

Test with `bubbleprof`:

- **Bubbles**: Represent different async operations.
- **Arrows**: Show relationships and how operations flow (e.g., one callback triggering another).
- **Bubble Size**: Indicates the time spent in that operation.
- **Arrows Width**: Shows the frequency of transitions between operations.

```bash
clinic bubbleprof --on-port 'autocannon localhost:$PORT' -- node slow-io
```

## License

[Apache 2.0](<https://tldrlegal.com/license/apache-license-2.0-(apache-2.0)>)
