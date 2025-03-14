function FeatureItem({ icon, text }) {
    return (
        <li className="flex items-center gap-3 p-4 bg-base-100 rounded-xl hover:bg-base-200 transition-colors">
            <span className="text-warning text-2xl">{icon}</span>
            <span className="text-lg font-medium">{text}</span>
        </li>
    );
}

export default FeatureItem;
