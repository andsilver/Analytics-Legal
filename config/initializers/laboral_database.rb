LABORAL_DB =
  YAML.load(
    ERB.new(File.read(File.join(Rails.root, "config", "laboral_database.yml"))).result
  )[Rails.env.to_s]