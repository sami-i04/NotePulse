import SwiftUI
import AppKit
import Charts

final class StateBox<T>: ObservableObject {
    @Published var value: T
    init(_ v: T) { value = v }
}

@propertyWrapper
struct Local<T>: DynamicProperty {
    @StateObject private var box: StateBox<T>
    init(wrappedValue: T) { _box = StateObject(wrappedValue: StateBox(wrappedValue)) }
    var wrappedValue: T {
        get { box.value }
        nonmutating set { box.value = newValue }
    }
    var projectedValue: Binding<T> {
        let b = box
        return Binding(get: { b.value }, set: { b.value = $0 })
    }
}
